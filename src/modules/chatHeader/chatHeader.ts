import Block from '../../utils/Block';
import './chatHeader.scss';

export interface ChatHeaderProps {
  name: string;
}

export class ChatHeader extends Block {
  constructor(props: ChatHeaderProps) {
    super(props);
  }

  render() {
    return `
            <div class='chatHeader__root'>
              <div class='chatHeader__avatar'>
                <img
                  alt='avatar'
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHiSURBVHgB7ZhbboJAFIYPaOIrO6hdgRAviU9lB3UHbXdAV1DdQbsC7Q50B/iqMdAdsINOX73R/7TYoEnBdMwwTeZLJsBw+zhzxyIQRVEzTdMxkotDh6pnul6vH/v9fmKx3H6/j0gPsTwCkl59t9s9W5blIHqvtVot8DxPUIVwwOA0hNNdo9EYW6vVKuUTsL3mkJIGQNJBqb5jV9iHTF3kmFwpOjZpjvaC9XMuQj0NsLnJDmftdntCiigVhFyMTSuXNUAlvkI9GZECCosYcvd0LPcFWthwuVz6pIBCQe6LCk77pIBCQUTqgyqmLILT385tt9sJKaBQkFsrhsCX03xEdqSqYy9txZ1OJ0CD4Ej6tm0LyMXdbjckRZzVD2ZCIVWAGepkMYKyGEFZzupm8iwWCxdrF5++JxG8bRZdj9EoRmefYHeOtUbY6/ViupQgrw0wpLnooF286PYvy9LsHk4DfBjPkARLQ3aOvLCs06+fCuFGHw/g1MKowaPH4UV0IXgFyc/1sf8EYY5yiLw3pBAfEeZXlj+rOpBQSXGpIqsWHPWjRtIkTTjIMaabkcUIymIEZTGCsvwLwUr/qJZh87hHmoIhb8aCD6RnFMVmswlsTG0STH082E5JDwRPu/gPP/+9+ARKDtlEuCVcWQAAAABJRU5ErkJggg=='
                  width='34'
                  height='34'
                />
              </div>
              <p class='chatHeader__chat-name'>{{name}}</p>
              <div class='chatHeader__options'>
                🌶️
              </div>
            </div>
  `;
  }
}
