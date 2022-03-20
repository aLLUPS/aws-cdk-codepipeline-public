import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { Pipeline } from 'aws-cdk-lib/aws-codepipeline';
import { CDKPipelineStage } from './stage';

export class AwsCodepipelineProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // make const pipeline variable
    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'CDKTestPipeline',       
      synth: new ShellStep('Synth', {        
        input: CodePipelineSource.gitHub('aLLUPS/aws-codepipeline-project', 'main'), 
        commands: ['npm ci',
                   'npm run build',
                   'npx cdk synth']
      }),
    });

    // add the following code snippet to pass the stage

    const testStage = pipeline.addStage(new CDKPipelineStage(this, "test", {
      env: { account:"205633759295", region: "us-east-1"}            //replace this with your aws-account-id and aws-region
    }));

    testStage.addPost(new ManualApprovalStep('Manaul approval step'));

    const productionStage = pipeline.addStage(new CDKPipelineStage(this, "production", {
      env: { account:"205633759295", region: "us-east-1"}            //replace this with your aws-account-id and aws-region
    }));
  }
}