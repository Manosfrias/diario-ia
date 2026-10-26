export class EntryController {
  #listEntries;
  #createEntry;

  constructor({ listEntries, createEntry }) {
    this.#listEntries = listEntries;
    this.#createEntry = createEntry;
  }

  list = async (_req, res) => {
    const entries = await this.#listEntries.execute();
    res.json(entries.map((entry) => entry.toPrimitives()));
  };

  create = async (req, res) => {
    const { date, rawText } = req.body ?? {};
    const entry = await this.#createEntry.execute({ date, rawText });
    res.status(201).json(entry.toPrimitives());
  };
}
