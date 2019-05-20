import View from './view';

export class Fighter {
  constructor({ name, health, attack, defense, source }) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.image = source;
  }

  getHitPower() {
    const criticalHitChance = Math.random() + 1;
    const power = this.attack * criticalHitChance;

    return power;
  }

  getBlockPower() {
    const dodgeChance = Math.random() + 1;
    const power = this.defense * dodgeChance;

    return power;
  }
}

export default class FighterView extends View {
  constructor(fighter, handleClick, inArena = false) {
    super();

    this.inArena = inArena;
    this.createFighter(fighter, handleClick);
  }

  createFighter(fighter, handleClick) {
    const { name, source } = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source);

    this.element = this.createElement({ tagName: 'div', className: 'fighter' });
    this.element.append(imageElement, nameElement);

    if (!this.inArena) {
      const editButtonElement = this.createEditButton();
      this.element.append(editButtonElement);
    }

    this.element.addEventListener('click', event => handleClick(event, fighter), false);
  }

  createName(name) {
    const nameElement = this.createElement({
      tagName: 'span',
      className: 'fighter-name',
    });
    nameElement.innerText = name;

    return nameElement;
  }

  createImage(source) {
    const attributes = { src: source };
    const imgElement = this.createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes,
    });

    return imgElement;
  }

  createEditButton() {
    const editElement = this.createElement({
      tagName: 'button',
      className: 'fighter-edit',
    });
    editElement.innerText = 'Edit fighter';

    return editElement;
  }
}
