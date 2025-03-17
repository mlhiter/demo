module.exports = {
  branches: ['main'], // 指定在哪个分支下要执行发布操作
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
      },
    ],
    '@semantic-release/release-notes-generator',
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
    [
      '@semantic-release/github',
      {
        assets: 'demo-*.zip',
      },
    ],
    '@semantic-release/git',
    [
      '@semantic-release/exec',
      {
        prepareCmd:
          'zip -qq -r demo-${nextRelease.version}.zip dist readme.md logo.svg LICENSE package.json',
      },
    ],
  ],
}
