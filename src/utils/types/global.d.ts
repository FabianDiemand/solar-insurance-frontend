// Add the ethereum variable to globalThis: https://stackoverflow.com/a/75671004
// Notice the file has to be announced in tsconfig's file property
export {}

declare global {
  var ethereum: any
}