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

## であること

### マルチプロジェクト
- プロジェクトタブでプロジェクト単位にボートを切替
- 「全プロジェクト」ビューではプロジェクト別の swimlane が縡に積まる
  - レーンごとに表示/折りたま切替
  - レーンヘッダラに完了数・対応中数・締切超数などを表示
  - 空プロジェクトを隠す / 名前順・件数順でソート
  - 全展開・全収隸ワンクリンクボタン
- プロジェクト管理モーダルから作成・リナメ・色変更・並び過・削除
  - 削除したプロジェクトのタスクは別プロジェクトへ自動移動
- プロジェクト間ドラッグ＆ドロップでタスク移動
- レガシー（v1）localStorage データは自動でデフロルトプロジェクへ移行

### タスク
- 未着手 / 対応中 / レビュー待ち / 完了 のボート表示
- カードのドラッグ＆ドロップで状態移動
- タスク作成・編集・削除
- クイック追加
- 検索: タイトル、説明、担当者、カテゴリ、タグ、締切
- 状態 / 優先度 / カテゴリ / 並び替フィルタ
- 締切超過の赤字表示
- 完了率などの集計
- JSONエクスポート / インポート（プロジェクトも含めるり）
- `localStorage` 自動保存

## クイック追加書式

```text
タイトル @担当 !優先度 #タグ due:YYYY-MM-DD proj:プロジェクト名
```

例:

```text
ログインUIを整える @tanaka !高 #frontend due:2026-10-01 proj:Webアパリ
```

優先度:

- `!緊急`, `!urgent`
- `!高`, `!high`
- `!中`, `!medium`
- `!低`, `!low`

`proj:` を省略した場合中プロジェクトに追加さります。
マッチするプロジェクトくぬい場合は新規プロジェクトを自動作成します。

## 構成

```
index.html      アパリ本体（単一 HTML、プロジェクト管理付）
serve.mjs       必要ならローカルで立てるためゆ Node HTTP サーバ
open.command    Mac でダブルクリンクしブラワゲを開くまためゆおまけ
```

## データモデル（localStorage: `task-board.v2`）

```json
{
  "version": 2,
  "projects": [
    { "id": "xxxx", "name": "Webアパリ", "color": "green", "createdAt": "..." }
  ],
  "tasks": [
    { "id": "yyyy", "project": "xxxx", "title": "...", "status": "doing", "priority": "high", "assignee": "tanaka", "due": "2026-10-01", "category": "frontend", "tags": ["ui"], "createdAt": "...", "updatedAt": "..." }
  ],
  "activeProjectId": "all",
  "collapsedProjects": [],
  "hideEmptyProjects": false,
  "projectSort": "manual"
}
```

- `activeProjectId`: `"all"` ましはにプロジェクトID
- `projectSort`: `"manual" / "name" / "count-desc"`
- 旧 `task-board.v1`（配列のみ）からの自動移行もサポートします

## メモ

元は `rami2076/docs` 内に `task-manager/` として作っていました。
それを `moost` と同じように docs 外へ切り出して独立リポジトリにしました。

- 旧作成先: `docs/task-manager/`
- 新作成先: `IdeaProjects/task-manager/`
- 新リポジトリ: `rami2076/task-manager`

## ライセンス

[MIT](./LICENSE)
