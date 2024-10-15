Basic repository for GA4 data handling in BigQuery, thanks to Dataform.
The repo is split in two parts:
- definitions: it has different level of file executions, split into different webdata typo scripts. The order of execution is source, staging, intermediate and finally reporting.
- includes:  it has different js files for function used in script and also variables for calling the various datasets.
The logic is underliying an execution of a Workflow, which triggers as soon as the daily GA4 happens. 
