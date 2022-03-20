import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';

export class AwsCodepipelineProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'Pipeline', {
      pipelineName: 'CDKTestPipeline',       // Creating a new code pipeline which is a construct
      synth: new ShellStep('Synth', {        // Add a new synthesis 'shellstep' which will be pointed at our gihub repository 
        input: CodePipelineSource.gitHub('aLLUPS/aws-codepipeline-project', 'main'), // replace the GitHub repository name with 'user-name/repository-name'
        
        // The build steps for the pipeline are defined by these commands
        
        commands: ['npm ci',
                   'npm run build',
                   'npx cdk synth']
      }),
    })
  }
}