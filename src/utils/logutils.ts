interface Log {
  date: Date;
  detail: String;
}

export class LogUtils {
  constructor() {}

  static log(obj: Object) {
    const now = new Date();

    const t = typeof obj;
    let text = `[Log](${now}): \n`

    switch (t) {
      case 'object':
        // text = text + JSON.stringify(obj,null, '\t')
        text = text + JSON.stringify(obj,null, 2)
        break;
      case 'string':
        text = text + obj
        break;
      default:
        console.log(`${t}`);
    }

    console.log(text)
  }
}
