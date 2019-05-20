import View from './view';
import FighterView from './fighter';
import { fighterService } from './services/fightersService';

class FightersController {
  constructor(fighters, handleFightStart) {
    const onFightStart = () => {
      if (this.selectedFighters.size == 2) {
        const selectedFighters = [];
        this.selectedFighters.forEach(val =>
          selectedFighters.push(this.fightersDetailsMap.get(val))
        );
        handleFightStart(selectedFighters);
      } else {
        alert('Choose 2 fighters!');
      }
    };
    this._view = new FightersView(fighters, this.handleFighterClick, onFightStart);
  }

  get element() {
    return this._view.element;
  }

  fightersDetailsMap = new Map();
  selectedFighters = new Set();

  handleFighterClick = async (event, fighter) => {
    const currentTarget = event.currentTarget;
    const { _id: id } = fighter;

    let fighterDetails;

    // Get fighter details and fetch them if needed
    if (this.fightersDetailsMap.has(id)) {
      fighterDetails = this.fightersDetailsMap.get(id);
    } else {
      fighterDetails = await fighterService.getFighterDetails(id);
      this.fightersDetailsMap.set(id, fighterDetails);
    }

    // Select fighter
    if (this.selectedFighters.has(id)) {
      this.selectedFighters.delete(id);
      currentTarget.classList.remove('fighter--selected');
    } else {
      if (this.selectedFighters.size < 2) {
        this.selectedFighters.add(id);
        currentTarget.classList.add('fighter--selected');
      }
    }

    if (event.target.classList.contains('fighter-edit')) {
      console.log('MODAL WINDOW');
    }
  };
}

class FightersView extends View {
  constructor(fighters, handleFighterClick, onFightStart) {
    super();

    this.onFightStart = onFightStart;
    this.createFighters(fighters, handleFighterClick);
  }

  createFighters(fighters, handleFighterClick) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, handleFighterClick);
      return fighterView.element;
    });

    const startButton = this.createStartButton();

    this.element = this.createElement({ tagName: 'div', className: 'fighters' });
    this.element.append(...fighterElements, startButton);
  }

  createStartButton() {
    const startButton = this.createElement({
      tagName: 'button',
      className: 'fighters-startFight',
    });
    startButton.innerText = 'Fight!';
    startButton.addEventListener('click', this.onFightStart);

    return startButton;
  }
}

export default FightersController;
