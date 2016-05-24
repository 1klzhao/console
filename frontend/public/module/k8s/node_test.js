describe('k8s', function() {
  'use strict';

  var k8sNodes;

  beforeEach(module('k8s'));
  beforeEach(inject(function(_k8sNodes_) {
    k8sNodes = _k8sNodes_;
  }));
  describe('#isTrusted', function() {
    it('returns true for falsy node', function () {
      expect(k8sNodes.isTrusted()).toEqual(true);
    });

    it('returns true for node without metadata', function () {
      expect(k8sNodes.isTrusted({})).toEqual(true);
    });

    it('returns true for node without annotations', function () {
      expect(k8sNodes.isTrusted({metadata: {}})).toEqual(true);
    });

    it('returns true for node without "scheduler.alpha.kubernetes.io/taints" annotation', function () {
      expect(k8sNodes.isTrusted({metadata: {annotations: {}}})).toEqual(true);
    });

    it('returns false for node with malformed "scheduler.alpha.kubernetes.io/taints" annotation', function () {
      expect(k8sNodes.isTrusted({metadata: {annotations: {'scheduler.alpha.kubernetes.io/taints': ''}}})).toEqual(false);
    });

    it('returns true when "scheduler.alpha.kubernetes.io/taints" annotation is 🍆', function () {
      expect(k8sNodes.isTrusted({metadata: {annotations: {'scheduler.alpha.kubernetes.io/taints': '[{"key": "🍆"}]'}}})).toEqual(true);
    });

    it('returns false when "scheduler.alpha.kubernetes.io/taints" annotation has untrusted key', function () {
      expect(k8sNodes.isTrusted({metadata: {annotations: {'scheduler.alpha.kubernetes.io/taints': '[{"key": "untrusted","value": "true","effect": "NoSchedule"}]'}}})).toEqual(false);
    });
  });
});
