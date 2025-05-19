
document.addEventListener("DOMContentLoaded", function () {
  try {
    const soldToSelect = document.getElementById("Soldto");
    const partyNameSelect = document.getElementById("Soldtopartyname");
    const contractSelect = document.getElementById("Servicecontract");
    const referenceSelect = document.getElementById("ExternalReferenceNo");
    const serialSelect = document.getElementById("SerialNumberofEquipment");
    const materialSelect = document.getElementById("MaterialDescription");
    const startSelect = document.getElementById("OriginalContractStart");
    const managerCodeSelect = document.getElementById("TerritoryManagerCode");
    const managerNameSelect = document.getElementById("TerritoryManagerFullName");

    // เติม Soldto
    for (const soldTo in subjectobject) {
      const option = new Option(soldTo, soldTo);
      soldToSelect.appendChild(option);
    }

    // เมื่อเลือก Soldto
    soldToSelect.addEventListener("change", function () {
      partyNameSelect.innerHTML = '<option value="">-- Sold-to-party name --</option>';
      const selected = subjectobject[this.value];
      if (!selected) return;

      for (const party in selected) {
        const option = new Option(party, party);
        partyNameSelect.appendChild(option);
      }
    });

    // เมื่อเลือก Soldtopartyname
    partyNameSelect.addEventListener("change", function () {
      contractSelect.innerHTML = '<option value="">-- Select Service contract --</option>';
      const soldTo = soldToSelect.value;
      const selected = subjectobject[soldTo]?.[this.value];
      if (!selected) return;

      for (const contract in selected) {
        const option = new Option(contract, contract);
        contractSelect.appendChild(option);
      }
    });

    // เมื่อเลือก Servicecontract
    contractSelect.addEventListener("change", function () {
      referenceSelect.innerHTML = '<option value="">-- External Reference No --</option>';
      const soldTo = soldToSelect.value;
      const party = partyNameSelect.value;
      const selected = subjectobject[soldTo]?.[party]?.[this.value];
      if (!selected) return;

      for (const ref in selected) {
        const option = new Option(ref, ref);
        referenceSelect.appendChild(option);
      }
    });

    // เมื่อเลือก ExternalReferenceNo
    referenceSelect.addEventListener("change", function () {
      const soldTo = soldToSelect.value;
      const party = partyNameSelect.value;
      const contract = contractSelect.value;
      const selected = subjectobject[soldTo]?.[party]?.[contract]?.[this.value];
      if (!selected) return;

      // เติม SerialNumberofEquipment
      serialSelect.innerHTML = '<option value="">-- Serial Number of Equipment --</option><option value="other">other</option>';
      for (const serial in selected) {
        const option = new Option(serial, serial);
        serialSelect.appendChild(option);
      }

      // เติม MaterialDescription, OriginalContractStart, ManagerCode, ManagerName
      materialSelect.innerHTML = '<option value="">-- Material Description --</option>';
      startSelect.innerHTML = '<option value="">-- Original Contract Start --</option>';
      managerCodeSelect.innerHTML = '<option value="">-- Territory Manager Code --</option>';
      managerNameSelect.innerHTML = '<option value="">-- Territory Manager Full Name --</option>';

      for (const serial in selected) {
        for (const date in selected[serial]) {
          for (const code in selected[serial][date]) {
            const names = selected[serial][date][code];
            materialSelect.appendChild(new Option(serial, serial));
            startSelect.appendChild(new Option(date, date));
            managerCodeSelect.appendChild(new Option(code, code));
            names.forEach(name => {
              managerNameSelect.appendChild(new Option(name, name));
            });
          }
        }
      }
    });

  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
  }
});
