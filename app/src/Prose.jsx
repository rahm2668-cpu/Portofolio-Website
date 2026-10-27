// One readable type rhythm for biographies, project stories, and CV bullets.
export function Prose({as:Tag='div',className='',children,...props}) {
  return <Tag className={'prose portfolio-prose text-[0.9375rem] leading-[1.8] sm:text-base prose-headings:text-balance prose-p:my-0 prose-p:text-pretty prose-ul:my-0 prose-ul:pl-5 prose-li:my-2 prose-li:text-pretty '+className} {...props}>{children}</Tag>;
}
