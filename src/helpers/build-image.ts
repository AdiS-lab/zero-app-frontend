function buildImage(buffer: Array<number>, mimetype: string) {
  const bytes = new Uint8Array(buffer);
  const binaryString = bytes.reduce( // converts byte arr to string of chars
    (accumulator, byte) => accumulator + String.fromCharCode(byte),
    "",
  ); 
  // todo: if gets to time-heavy explore TextDecoder
  const base64 = btoa(binaryString);
  return `data:${mimetype};base64,${base64}`;
}

export default buildImage;
