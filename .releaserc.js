module.exports = {
  branches: ['main'], // 指定在哪个分支下要执行发布操作
  plugins: [
    [
      '@semantic-release/commit-analyzer', // 分析 git 信息，决定版本号
      {
        preset: 'conventionalcommits',
      },
    ],
    '@semantic-release/release-notes-generator', // 生成 release notes
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md', // 把发布日志写入该文件
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    '@semantic-release/git', // 发版的更改（例如更改package.json等）提交到 git 仓库
    [
      '@semantic-release/exec', // 在 git 的某些阶段执行命令
      {
        // prepare阶段执行 zip 命令打包一个 zip 文件
        prepareCmd:
          'zip -qq -r demo-${nextRelease.version}.zip dist readme.md logo.svg LICENSE package.json',
      },
    ],
    [
      '@semantic-release/github', // 将上一步的 zip 文件发布到 github assets 里，这样就能在release 里下载
      {
        assets: 'demo-*.zip',
      },
    ],
  ],
}
