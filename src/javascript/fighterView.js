import View from './view';

class FighterView extends View {
  constructor(fighter, handleClick, handleEditClick) {
    super();

    this.createFighter(fighter, handleClick, handleEditClick);
  }

  createFighter(fighter, handleClick, handleEditClick) {
    const { name, source } = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source);
    const editButtonElement = this.createEditButton();

    this.element = this.createElement({ tagName: 'div', className: 'fighter' });
    this.element.append(imageElement, nameElement, editButtonElement);
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

export default FighterView;
