class APIFeatures {
  constructor(queryData, queryParams) {
    this.queryData = queryData;
    this.queryParams = queryParams;
  }
  filter() {
    let querry = { ...this.queryParams };
    const imposters = ["page", "limit", "sort"];
    imposters.forEach((el) => delete querry[el]);
    let querryS = JSON.stringify(querry);
    querryS = querryS.replace(/\b(gt|gte|lt|lte)\b/g, (x) => `$${x}`);
    this.queryData = this.queryData.find(JSON.parse(querryS));
    return this;
  }
  pagination() {
    const page = this.queryParams.page * 1 || 1;
    const limit = this.queryParams.limit * 1 || 2;
    const skip = (page - 1) * limit;
    this.queryData = this.queryData.skip(skip).limit(limit);
    return this;
  }
  sort() {
    if (this.queryParams.sort) {
      const sortBy = this.queryParams.sort.split(",").join(" ");
      this.queryData = this.queryData.sort(sortBy);
    } else {
      this.queryData = this.queryData.sort("-created_at");
    }
    return this;
  }
}
module.exports = APIFeatures;
