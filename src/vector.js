var EPSILON = 0.000001;

export class V {
	constructor(__x, __y) {
		this.set(__x, __y);
	}
	set(__x, __y) {
		this.x = isNaN(__x) ? 0 : __x;
		this.y = isNaN(__y) ? 0 : __y;
	}
	clone() {
		return new V(this.x, this.y, this.z);
	}
	// returns `this • __v`
	dot(__v) {
		return this.x * __v.x + this.y * __v.y;
	}
	multiply(__s) {
		return new V(this.x * __s, this.y * __s);
	}
	divide(__s) {
		return this.multiply(1 / __s);
	}
	add(__v) {
		return new V(this.x + __v.x, this.y + __v.y);
	}
	subtract(__v) {
		return new V(this.x - __v.x, this.y - __v.y);
	}
	magnitude2() {
		return this.x * this.x + this.y * this.y;
	}
	magnitude() {
		return Math.sqrt(this.magnitude2());
	}
	// Returns a normalized copy of the quaternion. *DOES NOT EDIT THIS OBJECT*
	normalized() {
		return this.multiply(1 / this.magnitude());
	}
	normalize() {
		var v = this.normalized();
		this.set(v.x, v.y);
	}

	static add(a,b) {
		return (new V(a.x,a.y)).add(b);
	}

	static subtract(a,b) {
		return (new V(a.x,a.y)).subtract(b);
	}

	static dot(a,b) {
		return (new V(a.x,a.y)).dot(b);
	}

	static divide(a,b) {
		return (new V(a.x,a.y)).divide(b);
	}

	static multiply(a,b) {
		return (new V(a.x,a.y)).multiply(b);
	}

	static magnitude2(a) {
		return (new V(a.x,a.y)).magnitude2();
	}
}

export default V;
