import MarkdownIt from 'markdown-it'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItHeadings from 'markdown-it-github-headings'
import markdownItLinkAttributes from 'markdown-it-link-attributes'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { pages } from '../paper/index'

const processor = new MarkdownIt({
  html: true,
})
  .use(markdownItFootnote)
  .use(markdownItHeadings, {
    prefixHeadingIds: false,
  })
  .use(markdownItLinkAttributes, {
    pattern: /^https:/,
    attrs: {
      target: '_blank',
      rel: 'noopener',
    },
  })

export const Paper = (): React.ReactElement => {
  const { id } = useParams()

  const slugs = Object.keys(pages)

  // Return 404 for unknown pages
  if (!slugs.includes(id)) {
    return <div>PAGE NOT FOUND</div>
  }

  const page = pages[id]
  const markdownContent = page.content
  const prev = slugs[slugs.indexOf(id) - 1]
  const next = slugs[slugs.indexOf(id) + 1]

  const navigation = (
    <div className="navigation">
      <span>
        {prev && (
          <Link to={`/paper/${prev}`}>
            ← Previous: {pages[prev].shortTitle || pages[prev].title}
          </Link>
        )}
      </span>

      {next && (
        <Link to={`/paper/${next}`} className="next">
          Next: {pages[next].shortTitle || pages[next].title} →
        </Link>
      )}
    </div>
  )

  const processed = { __html: processor.render(markdownContent) }

  return (
    <div id="paperPage">
      <div className="sectionIndicator">
        Section {Object.keys(pages).indexOf(id) + 1}
      </div>
      <h1 id="pageTitle">{page.title}</h1>

      {navigation}

      <hr />

      <div dangerouslySetInnerHTML={processed} />

      {navigation}
    </div>
  )
}
