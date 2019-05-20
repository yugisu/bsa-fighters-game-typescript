import View from './view';
import FighterView, { Fighter } from './fighter';

class Arena extends View {
  constructor(selectedFighters) {
    super();

    this.createArena(selectedFighters);

    this.fighter1 = new Fighter(selectedFighters[0]);
    this.fighter2 = new Fighter(selectedFighters[1]);

    this.fight();
  }

  fight = () => {
    let firstHit = true;

    this.hitInterval = setInterval(() => {
      if (firstHit) {
        let hitPower = this.fighter2.getHitPower() - this.fighter1.getBlockPower();
        hitPower = hitPower <= 0 ? 0 : hitPower;
        this.fighter1.health -= hitPower;
        this.fighter1.health <= 0 && this.finishGame(this.fighter2);

        this.fighter1health.innerText = this.fighter1health.innerText.replace(
          /[0-9]+/,
          this.fighter1.health.toFixed(0)
        );
      } else {
        let hitPower = this.fighter1.getHitPower() - this.fighter2.getBlockPower();
        hitPower = hitPower <= 0 ? 0 : hitPower;
        this.fighter2.health -= hitPower;
        this.fighter2.health <= 0 && this.finishGame(this.fighter1);

        this.fighter2health.innerText = this.fighter2health.innerText.replace(
          /[0-9]+/,
          this.fighter2.health.toFixed(0)
        );
      }
      firstHit = !firstHit;
    }, 200);
  };

  finishGame = winner => {
    clearInterval(this.hitInterval);

    const splash = this.createElement({
      tagName: 'div',
      className: 'finishSplash',
    });

    splash.innerText = `${winner.name} wins!`;

    this.element.parentNode.replaceChild(splash, this.element);
  };

  createArena = selectedFighters => {
    const fighterElements = this.createFighters(selectedFighters);

    this.element = this.createElement({
      tagName: 'div',
      className: 'arena',
    });
    this.element.append(...fighterElements);
  };

  createFighters = fighters => {
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
      this[`fighter${idx + 1}health`] = healthElement;

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
        tagName: 'block',
        className: 'fighter-stats',
      });
      stats.append(healthElement, attackElement, defenseElement);

      const { element } = new FighterView(fighter, () => {}, true);
      element.append(stats);
      return element;
    });

    return fighterElements;
  };
}

export default Arena;
