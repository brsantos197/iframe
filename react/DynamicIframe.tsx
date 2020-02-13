import Iframe from './Iframe'
import React from 'react'
import { useRuntime } from 'vtex.render-runtime'

const DynamicIframe: StorefrontFunctionComponent<DynamicIframeProps> = ({
  dynamicSrc = '',
  width,
  height,
  title,
}) => {
  const {
    route: { params },
  } = useRuntime()
  let allParamsExist = true
  const src = dynamicSrc.replace(/({[A-z0-9]*})/g, function(match: string) {
    const thisParam = match.replace(/{|}/g, '')
    if (thisParam && params[thisParam]) {
      return params[thisParam]
    }
    allParamsExist = false
    console.error(
      'parameter ' + thisParam + ' not found in runtime params: ' + params
    )
    return ''
  })

  if (allParamsExist !== true || src == '' || src == undefined) {
    return null
  }
  return <Iframe title={title} src={src} width={width} height={height} />
}

interface DynamicIframeProps {
  dynamicSrc: string
  width?: number
  height?: number
  title?: string
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
  },
}

export default DynamicIframe
