import ArenaComponent from './arena';
import FightersComponent from './fighters';

import { fighterService } from './services/fightersService';
import { FighterDetails } from './types/fighter.type';

class App {
  static rootElement = document.getElementById('root')!;
  static loadingElement = document.getElementById('loading-overlay')!;

  fightersElement: HTMLElement | undefined;

  constructor() {
    this.startApp();
  }

  async startApp() {
    try {
      App.loadingElement.style.visibility = 'visible';

      const fighters = await fighterService.getFighters();
      const fightersView = new FightersComponent(fighters, this.handleFightStart);
      this.fightersElement = fightersView.element;

      App.rootElement.appendChild(this.fightersElement!);
    } catch (error) {
      console.warn(error);
      App.rootElement.innerText = 'Failed to load data';
    } finally {
      App.loadingElement.style.visibility = 'hidden';
    }
  }

  handleFightStart = (selectedFighters: FighterDetails[]) => {
    const arenaView = new ArenaComponent(selectedFighters);
    const arenaElement = arenaView.element;

    if (arenaElement && this.fightersElement) {
      App.rootElement.replaceChild(arenaElement, this.fightersElement);
    }
  };
}

export default App;
