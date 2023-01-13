import { Link } from './link';
import { expect } from 'chai';
import Router from '../../utils/Router';
import sinon from 'sinon';

describe('Link', () => {
  it('should render', () => {
    new Link({ label: 'link', to: '/' });
  });

  it('element should return a', () => {
    const link = new Link({ label: 'link', to: '/' });
    const element = link.element;

    expect(element).to.be.instanceof(window.HTMLAnchorElement);
  });

  it('should go to passed route on click', () => {
    const link = new Link({ label: 'link', to: '/' });
    const spy = sinon.spy(Router, 'go');
    const element = link.element as HTMLSpanElement;

    element.click();

    expect(spy.calledOnce).to.eq(true);
  });
});
