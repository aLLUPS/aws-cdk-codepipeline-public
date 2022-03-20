import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaStack } from './lambda-stack';

export class CDKPipelineStage extends cdk.Stage{
    constructor(scope: Construct, stageName: string, props?: cdk.StageProps){
        super(scope, stageName, props);
        const lambdastack = new LambdaStack(this, 'LambdaStack', stageName);
    }
}