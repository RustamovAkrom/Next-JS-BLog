import { defineField, defineType } from "sanity"

export const CodeType = defineType({
  name: 'code',
  title: 'Code block',
  type: 'object',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'Python', value: 'python' },
          { title: 'CSS', value: 'css' },
          { title: 'HTML', value: 'html' },
        ],
      },
    }),
    defineField({
      name: 'filename',
      title: 'Filename',
      type: 'string',
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
    }),
  ],
})
