function getSpeechRecognitionApi() {
  return globalThis.SpeechRecognition ?? globalThis.webkitSpeechRecognition;
}

export class WebSpeechRecognizer {
  #lang;
  #recognition = null;

  constructor({ lang }) {
    this.#lang = lang;
  }

  isSupported() {
    return Boolean(getSpeechRecognitionApi());
  }

  start({ onTranscript, onEnd, onError }) {
    const SpeechRecognitionApi = getSpeechRecognitionApi();
    if (!SpeechRecognitionApi) throw new Error('Tu navegador no permite el dictado por voz');

    const recognition = new SpeechRecognitionApi();
    recognition.lang = this.#lang;
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .slice(event.resultIndex)
        .filter((result) => result.isFinal)
        .map((result) => result[0].transcript)
        .join(' ')
        .trim();
      if (transcript) onTranscript(transcript);
    };
    recognition.onerror = (event) => onError(new Error(`Error en el dictado: ${event.error}`));
    recognition.onend = () => {
      this.#recognition = null;
      onEnd();
    };

    recognition.start();
    this.#recognition = recognition;
  }

  stop() {
    this.#recognition?.stop();
  }
}
