import View from './view';
import FighterView, { Fighter } from './fighter';
import { FighterDetails } from './types/fighter.type';

class Arena extends View {
  private fighter1: Fighter;
  private fighter2: Fighter;

  private hitInterval: number | undefined;

  constructor(selectedFighters: FighterDetails[]) {
    super();

    this.element = this.createElement({
      tagName: 'div',
      className: 'arena',
    });

    this.createArena();

    this.addFighters(selectedFighters);

    this.fighter1 = new Fighter(selectedFighters[0]);
    this.fighter2 = new Fighter(selectedFighters[1]);

    this.fight();
  }

  createArena = () => {
    const announcement = this.createElement({
      tagName: 'h1',
      className: 'arena__announcement',
      attributes: {
        id: 'arena__announcement',
      },
    });

    announcement.innerText = 'Fight!';

    this.element.append(announcement);
  };

  addFighters = (fighters: FighterDetails[]) => {
    const fighterElements = fighters.map((fighter, idx) => {
      const { health, attack, defense } = fighter;

      const healthElement = this.createElement({
        tagName: 'span',
        className: 'fighter-stats-health',
        attributes: {
          id: `fighter${idx + 1}-health`,
        },
      });
      healthElement.innerText = `Health: ${health}`;

      const attackElement = this.createElement({
        tagName: 'span',
        className: 'fighter-stats-attack',
      });
      attackElement.innerText = `Attack: ${attack}`;

      const defenseElement = this.createElement({
        tagName: 'span',
        className: 'fighter-stats-defense',
      });
      defenseElement.innerText = `Defense: ${defense}`;

      const stats = this.createElement({
        tagName: 'div',
        className: 'fighter-stats',
      });
      stats.append(healthElement, attackElement, defenseElement);

      const { element } = new FighterView({ fighter, inArena: true });
      element.append(stats);

      return element;
    });

    this.element.append(...fighterElements);
  };

  fight = () => {
    const fighters = [this.fighter1, this.fighter2];
    let healthElements: HTMLElement[] = [];
    let arenaAnnounce: HTMLElement;

    this.hitInterval = window.setInterval(() => {
      if (!healthElements[0]) {
        const fighter1health = document.getElementById('fighter1-health')!;
        const fighter2health = document.getElementById('fighter2-health')!;

        healthElements = [fighter1health, fighter2health];
        arenaAnnounce = document.getElementById('arena__announcement')!;
      }

      const [attacker, defender] = fighters.reverse();
      const [_, defenderHealth] = healthElements.reverse();

      const hitPower = attacker.hit(defender);

      if (defender.stats.health <= 0) {
        this.finishGame(attacker);
      }

      arenaAnnounce.innerHTML = `${attacker.name} hit ${
        defender.name
      } for ${hitPower.toFixed(2)} hp`;

      if (defenderHealth) {
        defenderHealth.innerText = defenderHealth.innerText.replace(
          /[0-9]+/,
          defender.stats.health.toFixed(0)
        );
      }
    }, 750);
  };

  finishGame = (winner: Fighter) => {
    clearInterval(this.hitInterval);

    const splash = this.createElement({
      tagName: 'div',
      className: 'finishSplash',
    });

    splash.innerText = `${winner.name} wins!`;

    this.element.replaceWith(splash);
  };
}

export default Arena;
