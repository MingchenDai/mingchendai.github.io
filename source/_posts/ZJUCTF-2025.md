---
title: ZJUCTF 2025 Write-up
date : 2025-11-26 09:04:00
tags :
  - CTF
  - ZJU/SJTU CTF
  - Write-up
categories : Exploration
mathjax : true
---

This is a write-up for ZJUCTF 2025. The original challenge descriptions can be found at [https://mp.weixin.qq.com/s/Z91DTlJtvWClyCfnHpXTOQ](https://mp.weixin.qq.com/s/Z91DTlJtvWClyCfnHpXTOQ) for ZJU students or [https://notes.sjtu.edu.cn/s/nji8es_7e](https://notes.sjtu.edu.cn/s/nji8es_7e) for SJTU students.

All solution code and some challenge files referenced below are collected in the repository [MingchenDai/ZJUCTF-2025](https://github.com/MingchenDai/ZJUCTF-2025).

<!-- more -->

## MISC::Bingo

The challenge provides a $5\times 5$ bingo board with a set of constraints on each row, column and diagonal. Each cell can only be 0 or 1, so there are at most $2^{25}=33,554,432$ possible boards. This search space is small enough that a straightforward brute force over all boards is feasible.

I implemented this brute-force search in C++; see `Bingo/solution/bingo_solver.cpp` in the repository. The program iterates over all bitmasks from 0 to $2^{25}-1$, interprets each mask as a 5×5 board, and checks whether the board satisfies all given constraints.

Some constraints in the statement are ambiguous (for example, column 3 and 4 of rank 3, and column 5 of rank 4), so the solver intentionally skips those unclear conditions and only enforces the precise ones. Even with this partial checking, the search narrows all possible boards down to a handful of candidates:

```bash
Found solution #1:
ZJUCTF{00010_00010_00111_01010_01010}

Found solution #2:
ZJUCTF{00110_00010_00111_01010_01010}

Found solution #3:
ZJUCTF{10110_00010_00111_01010_01010}

Found solution #4:
ZJUCTF{00010_10010_00111_01010_01010}

Found solution #5:
ZJUCTF{00010_00011_00111_01010_01010}

Found solution #6:
ZJUCTF{00010_10011_00111_01010_01010}
```

Thus the exhaustive search over all $2^{25}$ boards reduces to only 6 candidate boards that satisfy all unambiguous constraints. Manually comparing each candidate with the original problem statement (and the intended interpretation of the vague constraints), we obtain the unique valid card and the final flag:

`ZJUCTF{10110_00010_00111_01010_01010}`.

## MISC::ZJUWLAN-Insecure

This challenge reproduces the authentication logic of the ZJU campus network portal. From previous experience with the SJTU `jAccount` login page, it is natural to inspect the JavaScript used to construct the login request and, in particular, the `info` field of the POST body.

By reading `ZJUWLAN-Insecure/challenge/Port.js` and `ZJUWLAN-Insecure/challenge/all.js` (copied from the real ZJU login page), we can see that `info` is produced as follows:

1. Build a JSON object containing `username`, `password`, `ip`, `acid` and `enc_ver`.
2. Serialize it to a JSON string.
3. Encrypt the string with the custom `xEncode` algorithm, using the `token` value as the key.
4. Apply a custom Base64 encoding, and finally prepend the string `{SRBX1}`.

I wrote a Node.js script `ZJUWLAN-Insecure/solution/generate_info.js` to reproduce this encoding process and confirm the behavior.

For the challenge itself, we are instead given a network capture `zjuwlan-insecure.pcap`. Inspecting the captured login request allows us to extract both the `token` and the `info` field directly from the HTTP POST:

- `token`: `517557d10a3aff098a898753317e8ef0b2822540d067490585c41d39d847ed7a`
- `info`: `{SRBX1}KxvFtemc1wBEGdNAbPEfd7s02umxP0Nagix+YxJsqbAEh5/fzuIYqad8xrqKW4yzfA9/I3xGKPMTNziE1wPFhfnCaX8CWsnglgKKjVozxsa46BrEY0n4kc/y2rdlbE7wWPBjdWxaZ4yfs8DLRovR7L==`

To recover the original JSON, we simply invert the above transformation: strip the `{SRBX1}` prefix, apply the custom Base64 decoding, then run `xEncode` decryption with the known `token`. I implemented this in another Node.js script `ZJUWLAN-Insecure/solution/decode_info.js`.

Running the decoder with the extracted parameters yields:

```bash
node decode_info.js --token 517557d10a3aff098a898753317e8ef0b2822540d067490585c41d39d847ed7a --info {SRBX1}KxvFtemc1wBEGdNAbPEfd7s02umxP0Nagix+YxJsqbAEh5/fzuIYqad8xrqKW4yzfA9/I3xGKPMTNziE1wPFhfnCaX8CWsnglgKKjVozxsa46BrEY0n4kc/y2rdlbE7wWPBjdWxaZ4yfs8DLRovR7L==
Decoded info JSON:
{
  "username": "3220100721",
  "password": "ZJUCTF{Thanks, TLS!}",
  "ip": "10.10.98.98",
  "acid": 3,
  "enc_ver": "srun_bx1"
}
```

Therefore, the password embedded in the login request is already the flag:

`ZJUCTF{Thanks, TLS!}`.

## CRYPTO::Crypt-it

The challenge provides a ciphertext `Crypt-it/flag.enc` and a corresponding RSA private key `Crypt-it/private_key.pem`. From the description (and by inspecting the key parameters), we know that the ciphertext is produced using RSA in OAEP mode.

The intended solution is simply to perform the RSA-OAEP decryption locally. OpenSSL’s `pkeyutl` command can do this directly:

```bash
openssl pkeyutl -decrypt \
  -in flag.enc \
  -out flag.dec \
  -inkey private_key.pem \
  -pkeyopt rsa_padding_mode:oaep
```

After running the command, the decrypted plaintext is written to `flag.dec`. Viewing this file reveals the flag:

`ZJUCTF{RSA_encrypt_with_OAEP_is_secure!}`.

## WEB::一觉醒来全世界计

> This challenge is accessed via WebSocket, so no challenge or solution source code is provided. Refer to the CTF official website for the full protocol details.

From observing the traffic and experimenting with the API, we find that the ranking is based purely on the `elapsed_time` field submitted by players. There is no server-side validation that `elapsed_time` must be non-negative or even realistic.

Therefore, we can submit an impossible but very small (negative) elapsed time to immediately jump to the top of the ranking. For example, sending a POST request to `/submit` with the following JSON payload is sufficient:

```json
{ "username": "senpai", "elapsed_time": -1 }
```

After the submission succeeds, a subsequent request to `/ranking` shows that this entry is now ranked first. The flag is exactly the username of the top-ranked player, so we obtain:

`ZJUCTF{are_you_really_primary_school_student_1bf1fcf1aea1}`.

## WEB::Submit Your Paper!

In this challenge, a simple paper submission system is provided. The backend logic in `paper.js` reveals that the flag is only appended to a paper’s abstract when the paper’s status is `Accept`, and only when the owner views that paper.

```javascript
router.get('/papers/:id/view', ensureAuthenticated, (req, res) => {
  db.get(`SELECT * FROM papers WHERE id = ? AND userId = ?`, [req.params.id, req.session.user.id], (err, paper) => {
    if (!paper) return res.status(404).send('Not found');
    paper.workers = JSON.parse(paper.workers);
    if (paper.status==='Accept') paper.abstract += `\nCongratulations for being Accepted! ${require("fs").readFileSync("/flag")}`;
    res.render('papers/view', { paper });
  });
});
```

Looking at the admin interface templates (for example, `views/admin/list.ejs`), the `abstract` field of each paper is rendered using the EJS unescaped tag `<%- ... %>`, which inserts the content as raw HTML instead of escaping it. This immediately suggests that if we can submit a paper whose abstract contains malicious HTML/JavaScript, we can achieve stored cross-site scripting (XSS).

The challenge description states that the administrator is implemented as a bot running a real Chromium instance. The bot logs in as admin and visits `/admin/papers`, viewing the table of all submitted papers. Any stored XSS payload in the `abstract` column is therefore executed in the admin’s browser session.

Our goal is to use this XSS primitive to change the status of our own paper to `Accept`. Once the status is updated, visiting the normal user-side paper view route `/papers/:id/view` as the paper owner will include the flag in the abstract.

We can craft an HTML payload that:

1. Locates the surrounding table row for the current paper.
2. Reads the `data-paper-id` attribute to determine the paper ID handled in that row.
3. Sends a `POST` request to the admin endpoint that changes the status of that paper to `Accept`.
4. Optionally removes the existing status badge from the row to reflect the change in the admin interface.

One such payload is:

```html
</span>
<img src=x onerror="
  r=this.closest('tr');
  i=r.dataset.paperId;
  fetch('/admin/papers/'+i+'/status',{
    method:'POST',
    headers:{'content-type':'application/x-www-form-urlencoded'},
    body:'status=Accept'});
  r.querySelector('.badge')?.remove()"
>
```

Here an image load failure is used to trigger the embedded JavaScript via the `onerror` handler. The script walks up the DOM to the closest `<tr>` row, reads its `data-paper-id`, then issues a `POST` to `/admin/papers/:id/status` with `status=Accept`. The final line removes the `.badge` element within that row to visually indicate the changed status.

After submitting a paper whose abstract contains this payload and waiting for the admin bot to visit `/admin/papers`, the XSS runs in the admin context and sets our paper’s status to `Accept`. When we subsequently view the paper as its owner at `/papers/:id/view`, the backend appends the contents of `/flag` to the abstract, revealing:

`ZJUCTF{congrats_for_being_accepted!_cd7637972512}`.

## WEB::你说你不懂 Linux

> This challenge is also accessed via WebSocket. The HTML response page is available at `你说你不懂Linux/index.html` in the repository.

The backend is implemented in PHP and takes a `file` parameter from the user, subject to several string-based filters. From reading the source, we can summarize the constraints as:

- The string must not contain `\\`.
- The string must not contain `flag` (case-sensitive).
- The string must not contain `txt` (case-sensitive).
- The string must contain the substring `.log`.
- In particular, the substring `flag.txt` (case-insensitive) must not appear.

At first glance this seems to rule out directly accessing `flag.txt`. However, the challenge is running on Windows, using the NTFS filesystem. On NTFS, both `/` and `\\` are accepted as path separators, and filename normalization rules allow certain tricks with trailing dots and spaces.

Two key observations make the bypass possible:

1. Because `/` is treated as a valid separator on Windows, we can write directory traversals like `/..../` instead of `\\..\\` and still have the path resolve correctly.
2. Windows normalizes filenames by ignoring trailing spaces and dots. For example, the path `FlAg.TxT. ` (note the trailing space) still refers to the file `FlAg.TxT` on disk.

Combining these facts, we can construct a `file` parameter that:

- Contains `.log` to pass the positive check.
- Uses `/../../../` with dots to traverse directories.
- Refers to `FlAg.TxT. ` with mixed case and a trailing space, so that:
  - The literal substring `flag.txt` does not appear in the parameter.
  - Windows still resolves the path to the actual `flag.txt` file.

A working value for `file` is:

`114514.log/../../../FlAg.TxT. `

Submitting this value successfully bypasses the filters and reads the flag:

`ZJUCTF{don't_say_you_are_unfamiliar_with_paths_again!_6232657393ee}`.

## REVERSE::Hello-reverse

This reverse-engineering warm-up provides a small binary `Hello-reverse/hello-reverse` with no additional obfuscation. Simply opening the executable in a hex editor and searching for the string `ZJUCTF{` immediately reveals the embedded flag:

`ZJUCTF{Hello_Let's_Reverse_2025🎉}`.

It is interesting to note that the organizers allowed an emoji inside the flag format.

## WELCOME::{ALL}

Omitted.
