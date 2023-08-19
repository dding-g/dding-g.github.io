---
title: "vscode 세팅 정리"
date: "2023-08-13T11:00:06.947Z"
description: 개인적으로 사용할 vscode 세팅 정리
tags:
  - vscode
---

- tailwind intellisense quick suggestion

  - ```
    "editor.quickSuggestions": {
       "strings": true
    },
    "css.validate": false,
    "editor.inlineSuggest.enabled": true
    ```

- eslint auto-fix all when save file

  - ```
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
    ```
