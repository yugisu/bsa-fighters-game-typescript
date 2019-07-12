import View from './view';
import FighterView, { Fighter } from './fighter';
import { FighterDetails } from './types/fighter.type';

class Arena extends View {
  private fighter1: Fighter;
  private fighter2: Fighter;

  private hitInterval: number | undefined;

  constructor(selectedFighters: FighterDetails[]) {
    super();

    this.createArena(selectedFighters);

    this.fighter1 = new Fighter(selectedFighters[0]);
    this.fighter2 = new Fighter(selectedFighters[1]);

    this.fight();
  }

  fight = () => {
    let firstHit = true;

    this.hitInterval = window.setInterval(() => {
      if (firstHit) {
        const fighter1health = document.getElementById('fighter1-health');

        let hitPower = this.fighter2.getHitPower() - this.fighter1.getBlockPower();
        hitPower = hitPower > 0 ? hitPower : 0;

        this.fighter1.stats.health -= hitPower;

        if (this.fighter1.stats.health <= 0) {
          this.finishGame(this.fighter2);
        }

        if (fighter1health) {
          fighter1health.innerText = fighter1health.innerText.replace(
            /[0-9]+/,
            this.fighter1.stats.health.toFixed(0)
          );
        }
      } else {
        const fighter2health = document.getElementById('fighter2-health');

        let hitPower = this.fighter1.getHitPower() - this.fighter2.getBlockPower();
        hitPower = hitPower > 0 ? hitPower : 0;

        this.fighter2.stats.health -= hitPower;

        if (this.fighter2.stats.health <= 0) {
          this.finishGame(this.fighter1);
        }

        if (fighter2health) {
          fighter2health.innerText = fighter2health.innerText.replace(
            /[0-9]+/,
            this.fighter2.stats.health.toFixed(0)
          );
        }
      }
      firstHit = !firstHit;
    }, 200);
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

  createArena = (selectedFighters: FighterDetails[]) => {
    const fighterElements = this.createFighters(selectedFighters);

    this.element = this.createElement({
      tagName: 'div',
      className: 'arena',
    });
    this.element.append(...fighterElements);
  };

  createFighters = (fighters: FighterDetails[]) => {
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

    return fighterElements;
  };
}

export default Arena;

type FighterHealthElements = 'fighter1health' | 'fighter2health';
