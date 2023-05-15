import React from 'react'
import { useRuntime } from 'vtex.render-runtime'

import Iframe from './Iframe'

interface Props {
  dynamicSrc: string
  width?: number
  height?: number
  title?: string
  allow?: string
  id?: string
  className?: string
  onLoad?: any
}

function DynamicIframe({
  dynamicSrc = '',
  width,
  height,
  title,
  allow,
  id,
  className,
  onLoad,
}: Props) {
  const {
    route: { params },
    query = {},
  } = useRuntime()

  const queryString = Object.keys(query).reduce((acc, key) => {
    return `${acc || '?'}${key}=${query[key]}&`
  }, '')

  let allParamsExist = true

  const src = dynamicSrc.replace(/({[A-z0-9]*})/g, (match: string) => {
    const thisParam = match.replace(/{|}/g, '')
    if (!thisParam || !params[thisParam]) {
      allParamsExist = false
      console.error(
        `parameter ${thisParam} not found in runtime params: ${params}`
      )
      return ''
    }
    return params[thisParam]
  })

  if (allParamsExist !== true || !src) {
    return null
  }

  return (
    <Iframe
      title={title}
      src={src + queryString}
      width={width}
      height={height}
      allow={allow}
      id={id}
      className={className}
      onLoad={onLoad}
    />
  )
}

DynamicIframe.schema = {
  title: 'editor.dynamiciframe.title',
  type: 'object',
  properties: {
    dynamicSrc: {
      title: 'editor.dynamiciframe.dynamicSrc.title',
      description: 'editor.dynamiciframe.dynamicSrc.description',
      type: 'string',
      default: null,
    },
    width: {
      title: 'editor.dynamiciframe.width.title',
      type: 'number',
      default: null,
    },
    height: {
      title: 'editor.dynamiciframe.height.title',
      type: 'number',
      default: null,
    },
    title: {
      title: 'editor.dynamiciframe.title.title',
      type: 'string',
      default: null,
    },
    id: {
      title: 'editor.dynamiciframe.id.title',
      type: 'string',
      default: null,
    },
    className: {
      title: 'editor.dynamiciframe.className.title',
      type: 'string',
      default: null,
    },
    onLoad: {
      title: 'editor.dynamiciframe.onLoad.title',
      type: 'string',
      default: null,
    },
    allow: {
      title: 'editor.dynamiciframe.allow.title',
      type: 'string',
      default: null,
    },
  },
}

export default DynamicIframe
