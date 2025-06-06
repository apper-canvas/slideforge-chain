import presentationsData from "../mockData/presentations.json";

class PresentationService {
  constructor() {
    this.presentations = [...presentationsData];
  }

  async getAll() {
    await this.delay();
    return [...this.presentations];
  }

  async getById(id) {
    await this.delay();
    const presentation = this.presentations.find(p => p.id === id);
    return presentation ? { ...presentation } : null;
  }

  async create(presentationData) {
    await this.delay();
    const newPresentation = {
      id: Date.now().toString(),
      ...presentationData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.presentations.push(newPresentation);
    return { ...newPresentation };
  }

  async update(id, updates) {
    await this.delay();
    const index = this.presentations.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error("Presentation not found");
    }
    this.presentations[index] = {
      ...this.presentations[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return { ...this.presentations[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.presentations.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error("Presentation not found");
    }
    this.presentations.splice(index, 1);
    return true;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }
}

export default new PresentationService();