const getEventParam = (
    eventParamName,
    eventParamType = "string",
    columnName = false
) => {
    let eventParamTypeName = "";
    switch (eventParamType) {
        case "string":
            eventParamTypeName = "string_value";
            break;
        case "int":
            eventParamTypeName = "int_value";
            break;
        case "double":
            eventParamTypeName = "double_value";
            break;
        case "float":
            eventParamTypeName = "float_value";
            break;
        default:
            throw "eventType is not valid";
    }
    return `(SELECT ep.value.${eventParamTypeName} AS ${eventParamName} 
  FROM UNNEST(event_params) ep WHERE ep.key = '${eventParamName}') AS ${
    columnName ? columnName : eventParamName
  }`;
};

const getEventParam_noalias = (
    eventParamName,
    eventParamType = "string"
) => {
    let eventParamTypeName = "";
    switch (eventParamType) {
        case "string":
            eventParamTypeName = "string_value";
            break;
        case "int":
            eventParamTypeName = "int_value";
            break;
        case "double":
            eventParamTypeName = "double_value";
            break;
        case "float":
            eventParamTypeName = "float_value";
            break;
        default:
            throw "eventType is not valid";
    }
    return `(SELECT ep.value.${eventParamTypeName} 
  FROM UNNEST(event_params) ep WHERE ep.key = '${eventParamName}')`;
};

const getIncrementalFilters = (test = false) => {
    const startDate = test ? 'current_date()-5' : 'date_checkpoint';
    const endDate = 'current_date()';
    const dateFilter = `(event_date >= ${startDate} and event_date <= ${endDate})`;
    const allFilter = `(1 = 1)`;

    return { startDate, endDate, dateFilter, allFilter };
};

const getItemNames = (itemsField, fieldName) => {
    return `(SELECT STRING_AGG(${fieldName}, ', ') 
          FROM UNNEST(${itemsField}) AS item) AS ${fieldName}`;
};


module.exports = {getEventParam, getEventParam_noalias, getIncrementalFilters, getItemNames}
