// types/react-player.d.ts
declare module "react-player" {
  import { Component } from "react"

  interface ReactPlayerProps {
    url: string
    playing?: boolean
    loop?: boolean
    controls?: boolean
    volume?: number
    muted?: boolean
    playbackRate?: number
    width?: string | number
    height?: string | number
    style?: React.CSSProperties
    progressInterval?: number
    playsinline?: boolean
    config?: object
    onReady?: () => void
    onStart?: () => void
    onPlay?: () => void
    onPause?: () => void
    onBuffer?: () => void
    onBufferEnd?: () => void
    onEnded?: () => void
    onError?: (error: any) => void
    onProgress?: (state: {
      played: number
      playedSeconds: number
      loaded: number
      loadedSeconds: number
    }) => void
    onDuration?: (duration: number) => void
  }

  export default class ReactPlayer extends Component<ReactPlayerProps> {}
}
