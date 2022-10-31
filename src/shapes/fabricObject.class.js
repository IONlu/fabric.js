import { FabricObjectAncestryMixin } from '../mixins/object_ancestry.mixin';
import { FabricObjectObjectStackingMixin } from '../mixins/object_stacking.mixin';
import { InteractiveFabricObject } from '../mixins/object_interactivity.mixin';
import { FabricObjectObjectStraighteningMixin } from '../mixins/object_straightening.mixin';
import { applyMixins } from '../util/applyMixins';

// TODO somehow we have to make a tree-shakeable import

applyMixins(InteractiveFabricObject, [
  FabricObjectAncestryMixin,
  FabricObjectObjectStackingMixin,
  FabricObjectObjectStraighteningMixin,
]);

export { InteractiveFabricObject as FabricObject };

(function (global) {
  const fabric = global.fabric;
  fabric.Object = InteractiveFabricObject;
})(typeof exports !== 'undefined' ? exports : window);
