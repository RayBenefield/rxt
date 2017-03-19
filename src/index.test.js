/* eslint-disable import/no-extraneous-dependencies */
import 'should';
import capitalized from 'lodash/capitalize';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import describe from '.';

const observableCapitalized = given => Observable.of(capitalized(given)).delay(1000);

describe('Testing', (it) => {
    it('should capitalize just hello', ex => ex
        .given('hello')
        .when(capitalized)
        .then(actual => actual.should.be.exactly('Hello'))
    );

    it('should capitalize {{given}}', ex => ex
        .givenEach(
            ['hello', 'world']
        )
        .when(capitalized)
        .thenEach(
            (actual, expected) => {
                actual.length.should.be.exactly(5);
                actual.should.be.exactly(expected);
            },
            ['Hello', 'World']
        )
    );

    it('should capitalize {{given}} with an observable', ex => ex
        .givenEach(
            ['hello', 'world']
        )
        .whenObserving(observableCapitalized)
        .thenEach(
            (actual, expected) => {
                actual.length.should.be.exactly(5);
                actual.should.be.exactly(expected);
            },
            ['Hello', 'World']
        )
    );

    it('should fail {{given}} with an observable', ex => ex
        .givenEach(
            ['hello', 'world']
        )
        .whenObserving(observableCapitalized)
        .thenEach(
            (actual, expected) => {
                actual.length.should.be.exactly(5);
                actual.should.be.exactly(expected);
            },
            ['hello', 'world']
        )
    );
});
