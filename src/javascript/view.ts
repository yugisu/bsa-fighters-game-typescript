type CreateElement = <S extends keyof HTMLElementTagNameMap>(props: {
  tagName: S;
  className?: string;
  attributes?: { [qualifiedName: string]: string };
}) => HTMLElementTagNameMap[S];

class View {
  element: HTMLElement;

  constructor() {
    this.element = this.createElement({ tagName: 'div' });
  }

  createElement: CreateElement = ({ tagName, className = '', attributes = {} }) => {
    const element = document.createElement(tagName);

    if (className) {
      element.classList.add(className);
    }

    Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]));

    return element;
  };
}

export default View;
