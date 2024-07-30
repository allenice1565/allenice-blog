export default {
    extends: ['@commitlint/config-conventional'],
    parserPreset: 'conventional-changelog-atom',
    formatter: '@commitlint/format',
    rules: {
        'type-enum': [2, 'always', ['foo']],
    },
    ignores: [
        (commit) => {
            return commit.trim() === '测试提交'
        },
    ],
    defaultIgnores: true,
    helpUrl:
        'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
    prompt: {
        messages: {},
        questions: {
            type: {
                description: 'please input type:',
            },
        },
    },
}
