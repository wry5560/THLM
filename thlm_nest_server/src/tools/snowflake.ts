export class Snowflake {
  twepoch: bigint;
  workerIdBits: bigint;
  dataCenterIdBits: bigint;
  maxWorkerId: bigint;
  maxDataCenterId: bigint;
  sequenceBits: bigint;
  workerIdShift: bigint;
  dataCenterIdShift: bigint;
  timestampLeftShift: bigint;
  sequenceMask: bigint;
  lastTimestamp: bigint;
  workerId: bigint;
  dataCenterId: bigint;
  sequence: bigint;

  constructor(workerId: number, dataCenterId: number, sequence: number) {
    this.twepoch = BigInt(1288834974657);
    this.workerIdBits = BigInt(5);
    this.dataCenterIdBits = BigInt(5);
    this.maxWorkerId = BigInt(-1) ^ (BigInt(-1) << this.workerIdBits);
    this.maxDataCenterId = BigInt(-1) ^ (BigInt(-1) << this.dataCenterIdBits);
    this.sequenceBits = BigInt(12);
    this.workerIdShift = this.sequenceBits;
    this.dataCenterIdShift = this.sequenceBits + this.workerIdBits;
    this.timestampLeftShift = this.sequenceBits + this.workerIdBits + this.dataCenterIdBits;
    this.sequenceMask = BigInt(-1) ^ (BigInt(-1) << this.sequenceBits);
    this.lastTimestamp = BigInt(-1);
    this.workerId = BigInt(workerId);
    this.dataCenterId = BigInt(dataCenterId);
    this.sequence = BigInt(sequence);
  }

  tilNextMillis(lastTimestamp) {
    let timestamp = this.timeGen();
    while (timestamp <= lastTimestamp) {
      timestamp = this.timeGen();
    }
    return timestamp;
  }

  timeGen() {
    return BigInt(Date.now());
  }

  nextId() {
    let timestamp = this.timeGen();
    if (timestamp < this.lastTimestamp) {
      throw new Error(`Clock moved backwards. Refusing to generate id for ${this.lastTimestamp - timestamp} milliseconds`);
    }
    if (this.lastTimestamp === timestamp) {
      this.sequence = (this.sequence + BigInt(1)) & this.sequenceMask;
      if (this.sequence === BigInt(0)) {
        timestamp = this.tilNextMillis(this.lastTimestamp);
      }
    } else {
      this.sequence = BigInt(0);
    }
    this.lastTimestamp = timestamp;
    return ((timestamp - this.twepoch) << this.timestampLeftShift) |
      (this.dataCenterId << this.dataCenterIdShift) |
      (this.workerId << this.workerIdShift) |
      this.sequence;
  }
}
