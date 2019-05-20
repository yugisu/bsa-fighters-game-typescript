import View from './view';
import FighterView from './fighterView';
import { fighterService } from './services/fightersService';

class FightersController {
  constructor(fighters) {
    this._view = new FightersView(fighters, this.handleFighterClick);
  }

  get element() {
    return this._view.element;
  }

  fightersDetailsMap = new Map();

  handleFighterClick = async (event, fighter) => {
    console.log('clicked');

    // get from map or load info and add to fightersMap
    // show modal with fighter info
    // allow to edit health and power in this modal
  };
}

class FightersView extends View {
  constructor(fighters, handleFighterClick) {
    super();

    this.createFighters(fighters, handleFighterClick);
  }

  createFighters(fighters, handleFighterClick) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, handleFighterClick);
      return fighterView.element;
    });

    this.element = this.createElement({ tagName: 'div', className: 'fighters' });
    this.element.append(...fighterElements);
  }
}

export default FightersController;
