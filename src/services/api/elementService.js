import elementsData from "../mockData/elements.json";

class ElementService {
  constructor() {
    this.elements = [...elementsData];
  }

  async getAll() {
    await this.delay();
    return [...this.elements];
  }

  async getById(id) {
    await this.delay();
    const element = this.elements.find(e => e.id === id);
    return element ? { ...element } : null;
  }

  async create(elementData) {
    await this.delay();
    const newElement = {
      id: Date.now().toString(),
      ...elementData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.elements.push(newElement);
    return { ...newElement };
  }

  async update(id, updates) {
    await this.delay();
    const index = this.elements.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error("Element not found");
    }
    this.elements[index] = {
      ...this.elements[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return { ...this.elements[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.elements.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error("Element not found");
    }
    this.elements.splice(index, 1);
    return true;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }
}

export default new ElementService();