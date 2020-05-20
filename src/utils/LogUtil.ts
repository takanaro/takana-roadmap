
interface Log {
  date : Date;
  detail: String;
}

export class LogUtil {
  constructor() {
  }

  static log (message: String) {
    const now = new Date()
    console.log(`[Log](${now}): ${message}`)
  }
}