javascript: var clientName = "1-800-Flowers";
var advertiserSearch = '1-800-Flowers';
var campaignFilterString = '27401';
var dateRangeFilterString = '90';
var searchLimit = 2;
var isClient = $('#client-tree-view').find("span").filter(function() {
    return ($(this).text() === clientName);
});
if (isClient.length) {
    isClient.click();
} else {
    alert("Couldnotfindclientwithvalue:\"" + clientName + "\"");
};
var searchCount = 0;
setTimeout(selectAdvertiser, 1000);

function selectAdvertiser() {
    var clickTarget = $('#advertiser-select').find('label').filter(function() {
        return ($(this).text().indexOf(advertiserSearch) > -1);
    });
    if (clickTarget.length) {
        clickTarget.click();
        $('#advertiser-select').click();
        setTimeout(selectCampaigns, 1000);
    } else {
        searchCount++;
        if (searchCount > searchLimit) {
            alert("Couldnotfindadvertiserwithvalue:\"" + advertiserSearch + "\"");
        } else {
            setTimeout(selectAdvertiser, 1000);
        }
    }
}

function selectCampaigns() {
    $('#campaign-select>button').click();
    var $input = $('#campaign-select>div>form>div.helperContainer.ng-scope>div:nth-child(2)>input');
    var scope = angular.element('#campaign-select>button').scope();
    $('#campaign-select>div>form>div.helperContainer.ng-scope>div:nth-child(2)>input').val(campaignFilterString);
    scope.inputLabel.labelFilter = campaignFilterString;
    scope.updateFilter();
    $('#campaign-select>div>form>div.helperContainer.ng-scope>div:nth-child(1)>button:nth-child(1)').click();
    $('#campaign-select>div>form>div.helperContainer.ng-scope>div:nth-child(1)>button.helperButton.helperButtonDone.ng-scope').click();
    setTimeout(selectDateRange, 500);
}

function selectDateRange() {
    $('#date-range-select > button').click();
    var scope = angular.element('#date-range-select>button').scope();
    $('#date-range-select>div>form>div.helperContainer.ng-scope>div>input').val(dateRangeFilterString);
    scope.inputLabel.labelFilter = dateRangeFilterString;
    scope.updateFilter();
    $('#date-range-select > div > form > div.checkBoxContainer.ng-isolate-scope > div > div > div > label > span').click();
}
void(null);