# Task Board

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

ローカル保存で動く単一 HTML のボード型タスク管理ツールです。
依存なしで `index.html` を開くだけで使えます。

## 作成場所

- リポジトリ: `rami2076/task-manager`
- ローカルパス: `/Users/hashimototadashi/IdeaProjects/task-manager`
- docs 側からは `../task-manager` として参照できる位置に置いてあります。

## 使い方

ブラウザで開くだけ:

```bash
open index.html
```

ローカルサーバーで起動:

```bash
npm start
# 相当: node serve.mjs
```

既定 URL:

- `http://localhost:4173/`
- LAN / Mac 側から触る場合: `http://<Mac の LAN IP>:4173/`
- Tailscale 越し: `http://<Tailscale IP>:4173/`

ダブルクリック用:

```bash
./open.command
```

## できること

- 未着手 / 対応中 / レビュー待ち / 完了 のボード表示
- カードのドラッグ＆ドロップで状態移動
- タスク作成・編集・削除
- クイック追加
- 検索: タイトル、説明、担当者、カテゴリ、タグ、締切
- 状態 / 優先度 / カテゴリ / 並び替フィルタ
- 締切超過の赤字表示
- 完了率などの集計
- JSONエクスポート / インポート
- `localStorage` 自動保存

## クイック追加書式

```text
タイトル @担当 !優先度 #タグ due:YYYY-MM-DD
```

例:

```text
ログインUIを整える @tanaka !高 #frontend due:2026-10-01
```

優先度:

- `!緊急`, `!urgent`
- `!高`, `!high`
- `!中`, `!medium`
- `!低`, `!low`

## 構成

```
index.html      アプリ本体（単一 HTML）
serve.mjs       必要ならローカルで立てるための Node HTTP サーバ
open.command    Mac でダブルクリックしてブラウザを開くためのおまけ
```

## メモ

元は `rami2076/docs` 内に `task-manager/` として作っていました。
それを `moost` と同じように docs 外へ切り出して独立リポジトリにしました。

- 旧作成先: `docs/task-manager/`
- 新作成先: `IdeaProjects/task-manager/`
- 新リポジトリ: `rami2076/task-manager`

## ライセンス

[MIT](./LICENSE)
