import View from './view';
import FighterView from './fighter';
import { fighterService } from './services/fightersService';
import { FighterType, FighterDetails } from './types/fighter.type';

class FightersController {
  _view: FightersView;

  fightersDetailsMap = new Map();
  selectedFighters = new Set();

  constructor(
    fighters: FighterType[],
    handleFightStart: (selectedFighters: FighterDetails[]) => void
  ) {
    this._view = new FightersView(
      fighters,
      this.handleFighterClick,
      this.onFightStart(handleFightStart)
    );
  }

  get element() {
    return this._view.element;
  }

  onFightStart = (
    handleFightStart: (selectedFighters: FighterDetails[]) => void
  ) => () => {
    if (this.selectedFighters.size === 2) {
      const selectedFighters: FighterDetails[] = [];
      this.selectedFighters.forEach((val) =>
        selectedFighters.push(this.fightersDetailsMap.get(val))
      );
      handleFightStart(selectedFighters);
    } else {
      alert('Choose 2 fighters!');
    }
  };

  handleFighterClick: FighterClickHandler = (fighter) => async (event) => {
    if (event) {
      const currentTarget = event.currentTarget as HTMLElement;
      const eventTarget = event.target as HTMLElement;

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

      if (eventTarget.classList.contains('fighter-edit')) {
        console.log('MODAL WINDOW');
      }
    }
  };
}

class FightersView extends View {
  constructor(
    fighters: FighterType[],
    handleClick: FighterClickHandler,
    onFightStart: () => void
  ) {
    super();

    this.element = this.createElement({ tagName: 'div', className: 'fighters' });

    this.addFighters(fighters, handleClick);
    this.addStartButton(onFightStart);
  }

  addFighters(fighters: FighterType[], handleClick: FighterClickHandler) {
    const fighterElements = fighters.map((fighter) => {
      const { element } = new FighterView({ fighter, handleClick });
      return element;
    });

    this.element.append(...fighterElements);
  }

  addStartButton(onFightStart: () => void) {
    const startButton = this.createElement({
      tagName: 'button',
      className: 'fighters-startFight',
    });
    startButton.innerText = 'Fight!';
    startButton.addEventListener('click', onFightStart);

    this.element.append(startButton);
  }
}

export type FighterClickHandler = (fighter: FighterType) => (event?: MouseEvent) => void;

export default FightersController;
