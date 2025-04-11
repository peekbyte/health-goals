provider "aws" {
  region = "eu-central-1"
}

variable "subnet_ids" {
  description = "List of subnet IDs"
  type        = list(string)
  default     = []
}


resource "aws_ecr_repository" "user_profile" {
  name = "user-profile-repo"
}

resource "aws_iam_role" "ecs_execution_role" {
  name = "ecs_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      }
      Effect    = "Allow"
    }]
  })
}

resource "aws_iam_role" "ecs_task_role" {
  name = "ecs_task_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      }
      Effect    = "Allow"
    }]
  })
}

resource "aws_ecs_cluster" "default" {
  name = "my-ecs-cluster"
}


resource "aws_ecs_task_definition" "user_profile" {
  family                = "user-profile"
  execution_role_arn    = aws_iam_role.ecs_execution_role.arn
  task_role_arn         = aws_iam_role.ecs_task_role.arn
  network_mode          = "awsvpc"
  container_definitions = jsonencode([{
    name      = "user-profile"
    image     = "${aws_ecr_repository.user_profile.repository_url}:latest"
    essential = true
    portMappings = [{
      containerPort = 3001
      hostPort      = 3001
    }]
  }])

  requires_compatibilities = ["FARGATE"]
  memory                   = "0.5GB"
  cpu                      = "0.25"
}


resource "aws_ecs_service" "user_profile" {
  name            = "user-profile-service"
  cluster         = aws_ecs_cluster.default.id
  task_definition = aws_ecs_task_definition.user_profile.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  network_configuration {
    subnets          = var.subnet_ids
    assign_public_ip = true
  }
}

output "health_goal_ecr_repo_url" {
  value = aws_ecr_repository.health_goal.repository_url
}

output "user_profile_ecr_repo_url" {
  value = aws_ecr_repository.user_profile.repository_url
}

output "ecs_cluster_id" {
  value = aws_ecs_cluster.default.id
}
