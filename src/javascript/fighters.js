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
  selectedFighters = new Set();

  handleFighterClick = async (event, fighter) => {
    const { _id: id } = fighter;

    if (this.selectedFighters.has(id)) {
      this.selectedFighters.delete(id);
      event.currentTarget.classList.remove('fighter--selected');
    } else {
      if (this.selectedFighters.size < 2) {
        this.selectedFighters.add(id);
        event.currentTarget.classList.add('fighter--selected');
      }
    }

    let fighterDetails;

    if (this.fightersDetailsMap.has(id)) {
      fighterDetails = this.fightersDetailsMap.get(id);
    } else {
      fighterDetails = await fighterService.getFighterDetails(id);
      this.fightersDetailsMap.set(id, fighterDetails);
    }

    if (event.target.classList.contains('fighter-edit')) {
      console.log('MODAL WINDOW');
    }
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
