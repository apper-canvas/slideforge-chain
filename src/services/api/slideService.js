import slidesData from "../mockData/slides.json";

class SlideService {
  constructor() {
    this.slides = [...slidesData];
  }

  async getAll() {
    await this.delay();
    return [...this.slides];
  }

  async getById(id) {
    await this.delay();
    const slide = this.slides.find(s => s.id === id);
    return slide ? { ...slide } : null;
  }

  async create(slideData) {
    await this.delay();
    const newSlide = {
      id: Date.now().toString(),
      ...slideData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.slides.push(newSlide);
    return { ...newSlide };
  }

  async update(id, updates) {
    await this.delay();
    const index = this.slides.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error("Slide not found");
    }
    this.slides[index] = {
      ...this.slides[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return { ...this.slides[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.slides.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error("Slide not found");
    }
    this.slides.splice(index, 1);
    return true;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }
}

export default new SlideService();