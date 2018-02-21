import chai from 'chai';
import {xor} from "../../../main/util/common";

chai.should();

describe('Video', function () {

    describe('manips', function () {
        it('xor true false', function () {
            xor(true,false).should.be.true;
        });
        it('xor true true', function () {
            xor(true, true).should.be.false;
        });
        it('xor false true', function () {
            xor(false, true).should.be.true;
        });
        it('xor false false', function () {
            xor(false ^ false).should.be.false;
        });
    });

});