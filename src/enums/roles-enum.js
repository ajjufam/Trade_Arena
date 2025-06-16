const RolesEnum = Object.freeze({
  NATIONAL: "NATIONAL",
  STATE: "STATE",
  ARENA: "ARENA",
  STORE: "STORE",
  CA: "CA", // only for national admin
  PA: "PA", // only for national and state admin
  FINANCE: "FINANCE", // only for national and state admin
  HELPER: "HELPER", // for all
});

module.exports = RolesEnum;
