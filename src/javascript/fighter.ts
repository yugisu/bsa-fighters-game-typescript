import View from './view';
import { FighterDetails, FighterType } from 'javascript/types/fighter.type';
import { FighterClickHandler } from './fighters';

export class Fighter {
  stats: { health: number; attack: number; defense: number };
  name: string;
  image: string;

  constructor({ source, name, ...stats }: FighterDetails) {
    this.stats = stats;
    this.name = name;
    this.image = source;
  }

  getHitPower() {
    const criticalHitChance = Math.random() + 1;
    const power = this.stats.attack * criticalHitChance;

    return power;
  }

  getBlockPower() {
    const dodgeChance = Math.random() + 1;
    const power = this.stats.defense * dodgeChance;

    return power;
  }
}

type Props = {
  fighter: FighterType;
  inArena?: boolean;
  handleClick?: FighterClickHandler;
};
export default class FighterView extends View {
  constructor({ fighter, inArena = false, handleClick = () => () => {} }: Props) {
    super();

    this.element = this.createElement({ tagName: 'div', className: 'fighter' });
    this.createFighter(fighter, handleClick, inArena);
  }

  createFighter(
    fighter: FighterType,
    handleClick: FighterClickHandler,
    inArena: boolean
  ) {
    const { name, source } = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source);

    this.element.append(imageElement, nameElement);

    if (!inArena) {
      const editButtonElement = this.createEditButton();
      this.element.append(editButtonElement);
    }

    this.element.addEventListener('click', handleClick(fighter), false);
  }

  createName(name: string) {
    const nameElement = this.createElement({
      tagName: 'span',
      className: 'fighter-name',
    });
    nameElement.innerText = name;

    return nameElement;
  }

  createImage(source: string) {
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
